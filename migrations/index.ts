import * as migration_20261113_032928_initial from './20261113_032928_initial';
import * as migration_20261115_191954_localization from './20261115_191954_localization';

export const migrations = [
  {
    up: migration_20261113_032928_initial.up,
    down: migration_20261113_032928_initial.down,
    name: '20261113_032928_initial',
  },
  {
    up: migration_20261115_191954_localization.up,
    down: migration_20261115_191954_localization.down,
    name: '20261115_191954_localization'
  },
];
