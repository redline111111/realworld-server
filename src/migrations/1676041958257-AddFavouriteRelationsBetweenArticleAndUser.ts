import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFavouriteRelationsBetweenArticleAndUser1676041958257 implements MigrationInterface {
    name = 'AddFavouriteRelationsBetweenArticleAndUser1676041958257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles_favourites_articles" ("articlesId_1" integer NOT NULL, "articlesId_2" integer NOT NULL, CONSTRAINT "PK_a5c83d762ac4f92f5a051f3f454" PRIMARY KEY ("articlesId_1", "articlesId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34ce6ca5d407578115013f6e03" ON "articles_favourites_articles" ("articlesId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_504350506504ee0e4cb389c94d" ON "articles_favourites_articles" ("articlesId_2") `);
        await queryRunner.query(`ALTER TABLE "articles_favourites_articles" ADD CONSTRAINT "FK_34ce6ca5d407578115013f6e039" FOREIGN KEY ("articlesId_1") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "articles_favourites_articles" ADD CONSTRAINT "FK_504350506504ee0e4cb389c94d8" FOREIGN KEY ("articlesId_2") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles_favourites_articles" DROP CONSTRAINT "FK_504350506504ee0e4cb389c94d8"`);
        await queryRunner.query(`ALTER TABLE "articles_favourites_articles" DROP CONSTRAINT "FK_34ce6ca5d407578115013f6e039"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_504350506504ee0e4cb389c94d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34ce6ca5d407578115013f6e03"`);
        await queryRunner.query(`DROP TABLE "articles_favourites_articles"`);
    }

}
