import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Migration {
   private static _migrations: Function[] = [];
   private static _AsyncStorageKey: string = 'migration_key';
   private static _version: number = 0;
   private static debug: boolean = false;
   static DEBUG = (debug: boolean) => (Migration.debug = debug);

   private static done() {
      this.version = this.migrations.length;
      this.setPersistentVersion(this.version);
   }
   static async migrate() {
      try {
         const version = parseInt((await AsyncStorage.getItem(Migration.AsyncStorageKey)) || '0', 10);
         this.version = version;
         this.log(`version number => ${version}`);
      } catch (error) {
         this.error(error);
      }

      if (this.migrations.length === 0) {
         this.done();
         return;
      }

      for (let i = this.version; i < this.migrations.length; i++) {
         const migrationError = () => {
            this.error(`migration number ${i} could not migrate`);
         };
         const migration = this.migrations[i];

         try {
            migration ? migration() : migrationError();
            this.log(`migration number ${i} is migrated`);
         } catch (error) {
            this.error(error);
         }
      }
      this.done();
      return;
   }
   private static async setPersistentVersion(version: number) {
      try {
         await AsyncStorage.setItem(this.AsyncStorageKey, version.toString());
         this.log(`version set to => ${version}`);
      } catch (error) {
         this.error(error);
      }
   }

   public static get version(): number {
      return this._version;
   }
   public static set version(value: number) {
      this._version = value;
   }
   public static get migrations(): Function[] {
      return this._migrations;
   }
   public static set migrations(value: Function[]) {
      this._migrations = value;
   }
   public static get AsyncStorageKey(): string {
      return this._AsyncStorageKey;
   }
   public static set AsyncStorageKey(value: string) {
      this._AsyncStorageKey = value;
   }
   private static log(text: string | null) {
      this.debug && console.log(`[Migration] - ${text}`);
   }
   private static error(errorMessage: string) {
      console.warn(`[Migration] - ${errorMessage}`);
   }
}
