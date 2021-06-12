import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPictureFieldToItems1623456336066
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'picture',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'picture');
  }
}
