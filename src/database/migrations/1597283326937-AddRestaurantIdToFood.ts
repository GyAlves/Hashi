import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddRestaurantIdToFood1597283326937
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'foods',
      new TableColumn({
        name: 'restaurant_id',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'foods',
      new TableForeignKey({
        name: 'FoodRestaurant',
        columnNames: ['restaurant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurants',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('foods', 'FoodRestaurant');
    await queryRunner.dropColumn('foods', 'restaurant_id');
  }
}
