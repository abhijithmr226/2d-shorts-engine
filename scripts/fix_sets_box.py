import re

with open("src/ep3/sets.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Pattern for <Box w={...} h={...} d={...} ... />
def repl(m):
    w = m.group(1)
    h = m.group(2)
    d = m.group(3)
    rest = m.group(4)
    return f"<Box size={[{w}, {h}, {d}]}{rest}"

# Regex matching <Box w={...} h={...} d={...}
new_text = re.sub(r"<Box\s+w=\{([^}]+)\}\s+h=\{([^}]+)\}\s+d=\{([^}]+)\}([^>]*>)", repl, text)

# Also check Ground: in kit.tsx: Ground takes map: THREE.Texture, not color!
# Let's check Ground in kit.tsx:
# export const Ground: React.FC<{ map: THREE.Texture; size?: number; y?: number; pos?: V3 }>

with open("src/ep3/sets.tsx", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Updated Box size syntax in src/ep3/sets.tsx!")

