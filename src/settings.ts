import { SettingItemType } from 'api/types';
import joplin from '../api';

export async function registerSettings() {
  await joplin.settings.registerSection('edgeLinkMd.settings', {
    label: 'Edge Link MD',
    iconName: 'fas fa-link',
  });

  await joplin.settings.registerSettings({
    triggerShortcut: {
      type: SettingItemType.String,
      value: 'Ctrl+Shift+V',
      description: 'Shortcut to paste and convert. Restart Joplin to apply. (When set to Ctrl+Shift+V, this plugin will prevent default special paste behavior.)',
      section: 'edgeLinkMd.settings',
      public: true,
      label: 'Keyboard Shortcut',
    },
  });
}

export function settingValue(key: string) {
  return joplin.settings.value(key);
}