class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id
      t.integer :movie_id
      t.boolean :approve, default: false
      t.timestamps
    end
  end
end
