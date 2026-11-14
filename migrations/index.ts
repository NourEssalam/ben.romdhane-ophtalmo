import * as migration_20261113_032928_initial from './20261113_032928_initial';

export const migrations = [
  {
    up: migration_20261113_032928_initial.up,
    down: migration_20261113_032928_initial.down,
    name: '20261113_032928_initial'
  },
];
