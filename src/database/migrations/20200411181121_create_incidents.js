exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('help_id').notNullable();

        table.foreign('help_id').references('id').inTable('usuarios');

    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('incidents');
  };
  