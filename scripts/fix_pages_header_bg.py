"""
Добавляет SiteHeader + SiteFooter на все подстраницы и убирает bg-paper-grid.
"""
import re
from pathlib import Path

PAGES = [
    'src/app/news/page.tsx',
    'src/app/simulator/page.tsx',
    'src/app/seismoprotection/page.tsx',
    'src/app/seismoizolyatory/page.tsx',
    'src/app/antidron/page.tsx',
    'src/app/sertifikaty/page.tsx',
    'src/app/earthquake/[id]/page.tsx',
]

for page_path in PAGES:
    path = Path(page_path)
    if not path.exists():
        print(f"SKIP (not found): {page_path}")
        continue
    
    content = path.read_text(encoding='utf-8')
    modified = False
    
    # 1. Заменить bg-paper-grid на bg-white
    if 'bg-paper-grid' in content:
        content = content.replace('bg-paper-grid', 'bg-white')
        modified = True
        print(f"  bg-paper-grid → bg-white: {page_path}")
    
    # 2. Добавить импорт SiteHeader если нет
    if 'SiteHeader' not in content:
        # Найдём последний import и добавим после него
        import_line = 'import { SiteHeader } from "@/components/site/site-header";\n'
        # Найдём место после последнего import
        imports = list(re.finditer(r'^import\s.*?;\s*$', content, re.M))
        if imports:
            last_import = imports[-1]
            content = content[:last_import.end()] + '\n' + import_line + content[last_import.end():]
            modified = True
            print(f"  + import SiteHeader: {page_path}")
    
    # 3. Добавить <SiteHeader /> после <main...> если нет
    if '<SiteHeader' not in content:
        # Найдём <main ...> и добавим SiteHeader после него
        main_match = re.search(r'(<main[^>]*>)', content)
        if main_match:
            insert_pos = main_match.end()
            content = content[:insert_pos] + '\n      <SiteHeader />' + content[insert_pos:]
            modified = True
            print(f"  + <SiteHeader />: {page_path}")
    
    if modified:
        path.write_text(content, encoding='utf-8')
        print(f"  SAVED: {page_path}")
    else:
        print(f"  NO CHANGES: {page_path}")

print("\nDone!")
