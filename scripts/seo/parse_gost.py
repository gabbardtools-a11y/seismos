#!/usr/bin/env python3
"""
parse_gost.py — парсинг извлечённого из PDF текста ГОСТа в структурированный JSON.

Из txt-файла извлекает:
- Метаданные (название, номер, год)
- Содержание (оглавление)
- Разделы (по заголовкам ВВЕДЕНИЕ, 1. ОБЛАСТЬ ПРИМЕНЕНИЯ, 2. НОРМАТИВНЫЕ ССЫЛКИ и т.д.)
- Подразделы (1.1, 1.2, ...)
- Список нормативных ссылок (для кросс-ссылок)

Использование:
  python3 parse_gost.py input.txt > output.json
"""

import json
import re
import sys
from pathlib import Path


# Паттерны
RE_DOC_CODE = re.compile(
    r'^(ГОСТ\s+(Р\s+)?[А-Яа-я\s\d\.\-]+(?:\s+ISO\s+\d+(?:-\d+)?)?|'
    r'СП\s+\d+\.\d+(?:\.\d+)?|'
    r'СНиП\s+[IVXLCDM.\d\-]+(?:\*?))',
    re.MULTILINE
)
RE_SECTION = re.compile(r'^(\d+)\.\s+([А-ЯА-ЯA-Z][А-Яа-яA-Za-z\s,\.\-]+?)$', re.MULTILINE)
RE_SUBSECTION = re.compile(r'^(\d+\.\d+)\s+([А-ЯA-Z][А-Яа-яA-Za-z\s,\.\-]+?)$', re.MULTILINE)
RE_NORM_REF = re.compile(
    r'(ГОСТ\s+(?:Р\s+)?[А-Яа-я\d\.\-]+(?:-\d+)?)'
)
RE_PAGE_MARKER = re.compile(r'^\s*\d+\s*$', re.MULTILINE)  # номера страниц в одиночку


def clean_text(text: str) -> str:
    """Удалить артефакты PDF-извлечения."""
    # Удалить символы перевода страницы
    text = text.replace('\x0c', '\n')
    # Удалить повторяющиеся пробелы
    text = re.sub(r'[ \t]+', ' ', text)
    # Удалить пустые строки в начале
    text = text.strip()
    return text


def extract_metadata(text: str) -> dict:
    """Извлечь метаданные документа."""
    lines = text.split('\n', 30)
    
    # Поиск кода документа (ГОСТ, СП, СНиП)
    doc_code = None
    doc_title = None
    for i, line in enumerate(lines[:15]):
        line = line.strip()
        if not line:
            continue
        # Пропустить строки типа "Скачать ГОСТ..."
        if line.startswith('Скачать'):
            continue
        m = RE_DOC_CODE.match(line)
        if m and not doc_code:
            doc_code = m.group(1).strip()
            # Заголовок — следующие несколько значимых строк
            for j in range(i+1, min(i+5, len(lines))):
                t = lines[j].strip()
                if t and not t.startswith('Скачать') and not RE_DOC_CODE.match(t):
                    doc_title = t
                    break
            break
    
    # Если код не найден в начале — ищем по всему тексту в первых 100 строках
    if not doc_code:
        for line in lines[:50]:
            line = line.strip()
            if line.startswith('Скачать'):
                continue
            m = RE_DOC_CODE.search(line)
            if m:
                doc_code = m.group(1).strip()
                break
    
    # Год
    year = None
    if doc_code:
        m = re.search(r'-(\d{2,4})', doc_code)
        if m:
            yr = int(m.group(1))
            year = yr if yr > 1900 else (1900 + yr if yr < 50 else 2000 + yr)
    
    return {
        'code': doc_code or 'НЕИЗВЕСТНЫЙ ДОКУМЕНТ',
        'title': doc_title or '',
        'year': year,
    }


def extract_sections(text: str) -> list:
    """Разбить текст на разделы по заголовкам 1. НАЗВАНИЕ, 2. НАЗВАНИЕ."""
    # Найти все позиции разделов
    matches = list(RE_SECTION.finditer(text))
    if not matches:
        return [{
            'number': '',
            'title': 'Текст документа',
            'content': text,
        }]
    
    sections = []
    
    # Текст до первого раздела (Введение, предисловие)
    if matches[0].start() > 100:
        pre_text = text[:matches[0].start()].strip()
        if pre_text and len(pre_text) > 50:
            sections.append({
                'number': '',
                'title': 'Введение',
                'content': pre_text,
            })
    
    for i, m in enumerate(matches):
        num = m.group(1)
        title = m.group(2).strip()
        start = m.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(text)
        content = text[start:end].strip()
        sections.append({
            'number': num,
            'title': title,
            'content': content,
        })
    
    return sections


def extract_norm_refs(text: str) -> list:
    """Извлечь список всех нормативных документов, упомянутых в тексте."""
    refs = set()
    for m in RE_NORM_REF.finditer(text):
        ref = m.group(1).strip()
        # Нормализация: удалить лишние пробелы
        ref = re.sub(r'\s+', ' ', ref)
        refs.add(ref)
    return sorted(refs)


def parse_document(text_path: str) -> dict:
    """Парсинг одного документа."""
    text = Path(text_path).read_text(encoding='utf-8', errors='replace')
    text = clean_text(text)
    
    metadata = extract_metadata(text)
    sections = extract_sections(text)
    norm_refs = extract_norm_refs(text)
    
    return {
        'metadata': metadata,
        'sections': sections,
        'norm_refs': norm_refs,
        'stats': {
            'chars': len(text),
            'lines': text.count('\n'),
            'sections_count': len(sections),
            'norm_refs_count': len(norm_refs),
        },
    }


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: parse_gost.py input.txt [output.json]', file=sys.stderr)
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    result = parse_document(input_path)
    
    if output_path:
        Path(output_path).write_text(
            json.dumps(result, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )
        print(f'✓ {input_path} → {output_path}', file=sys.stderr)
        print(f'  Код: {result["metadata"]["code"]}', file=sys.stderr)
        print(f'  Разделов: {result["stats"]["sections_count"]}', file=sys.stderr)
        print(f'  Нормативных ссылок: {result["stats"]["norm_refs_count"]}', file=sys.stderr)
        print(f'  Символов: {result["stats"]["chars"]}', file=sys.stderr)
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))
