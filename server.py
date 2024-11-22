import json
import pyautogui
import time

def execute_macro(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        actions = json.load(f)
    for action in actions:
        if action['type'] == 'click':
            pyautogui.click(x=action['x'], y=action['y'])
        elif action['type'] == 'type':
            pyautogui.typewrite(action['text'])
        elif action['type'] == 'wait':
            time.sleep(action['seconds'])

if __name__ == "__main__":
    execute_macro("macro_script.json")
