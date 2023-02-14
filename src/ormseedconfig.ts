import ormconfig from './ormconfig'

const ormseedconfig = {
    ...ormconfig,
    migrations: [__dirname + '/seeds/**/*{.ts,.ts}'],
    cli: {
        migrationsDir: 'src/seeds',
    }
}
export default ormseedconfig