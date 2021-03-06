
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments('incident');

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();

        table.string('ong').notNullable();

        table.foreign('ong').references('ong').inTable('ongs');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
