import { DataSource } from 'typeorm';

export const DatabaseProvider = [
    {
        provide: DataSource,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'Event_Management_System',
                entities: [
                    __dirname + '../entities/*.entity.ts',
                ],
                synchronize: true,
            });
            try {
                if (!dataSource.isInitialized) {
                    await dataSource.initialize();
                }
            } catch (error) {
                console.error(error?.message);
            }
            return dataSource;
        }
    }
];