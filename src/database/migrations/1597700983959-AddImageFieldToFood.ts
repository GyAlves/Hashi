import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageFieldToFood1597700983959
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'foods',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('foods', 'image');
  }
}
