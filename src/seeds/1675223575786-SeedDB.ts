import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedDb1675223575786 implements MigrationInterface{
    name = 'SeedDb1675223608836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`
        );

        await queryRunner.query(
            //password is 123
            `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@mail.com', '$2b$10$B.fcP8lCZ6bM/W7LDb5k1.ha9dg7ys2X/0prYjQrnQql3qpAEfmVC')`
        );

        await queryRunner.query(
            `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee, dragons', 1')`
        );

        await queryRunner.query(
            `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee, dragons', 2')`
        );
    }

    public async down(): Promise<void> {}
}
