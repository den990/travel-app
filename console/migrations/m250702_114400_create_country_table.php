<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%country}}`.
 */
class m250702_114400_create_country_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%country}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull()->comment('Название страны'),
            'region_id' => $this->integer()->notNull()->comment('Регион'),
            'slug' => $this->string()->notNull()->comment('Ссылка')
        ]);

        $this->addForeignKey(
            'fk-country-region_id',
            '{{%country}}',
            'region_id',
            '{{%region}}',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->batchInsert('{{%country}}', ['name', 'region_id', 'slug'], [
            ['Canada', 1, 'canada'],
            ['United States', 1, 'united-states'],
            ['Belize', 2, 'belize'],
            ['Costa Rica', 2, 'costa-rica'],
            ['Cuba', 2, 'cuba'],
            ['El Salvador', 2, 'el-salvador'],
            ['Guatemala', 2, 'guatemala'],
            ['Honduras', 2, 'honduras'],
            ['Mexico', 2, 'mexico'],
            ['Nicaragua', 2, 'nicaragua'],
            ['Argentina', 3, 'argentina'],
            ['Bolivia', 3, 'bolivia'],
            ['Brazil', 3, 'brazil'],
            ['Chile', 3, 'chile'],
            ['Colombia', 3, 'colombia'],
            ['Ecuador', 3, 'ecuador'],
            ['Patagonia', 3, 'patagonia'],
            ['Galápagos Islands', 3, 'galapagos'],
            ['Inca Trail', 3, 'inca-trail'],
            ['Machu Picchu', 3, 'machu-picchu'],
            ['Peru', 3, 'peru'],
            ['Uruguay', 3, 'uruguay'],
            ['Canary Islands', 4, 'canary-islands'],
            ['Croatia', 4, 'croatia'],
            ['France', 4, 'france'],
            ['Germany', 4, 'germany'],
            ['Greece', 4, 'greece'],
            ['Iceland', 4, 'iceland'],
            ['Ireland', 4, 'ireland'],
            ['Italy', 4, 'italy'],
            ['Portugal', 4, 'portugal'],
            ['Spain', 4, 'spain'],
            ['Turkey', 4, 'turkey'],
            ['United Kingdom', 4, 'united-kingdom'],
            ['Egypt', 5, 'egypt'],
            ['Jordan', 5, 'jordan'],
            ['Morocco', 5, 'morocco'],
            ['Oman', 5, 'oman'],
            ['Botswana', 6, 'botswana'],
            ['Kenya', 6, 'kenya'],
            ['Madagascar', 6, 'madagascar'],
            ['Malawi', 6, 'malawi'],
            ['Namibia', 6, 'namibia'],
            ['Rwanda', 6, 'rwanda'],
            ['South Africa', 6, 'south-africa'],
            ['Tanzania', 6, 'tanzania'],
            ['Uganda', 6, 'uganda'],
            ['Zambia', 6, 'zambia'],
            ['Bali', 7, 'bali'],
            ['Cambodia', 7, 'cambodia'],
            ['China', 7, 'china'],
            ['India', 7, 'india'],
            ['Indonesia', 7, 'indonesia'],
            ['Japan', 7, 'japan'],
            ['Maldives', 7, 'maldives'],
            ['Nepal', 7, 'nepal'],
            ['South Korea', 7, 'south-korea'],
            ['Sri Lanka', 7, 'sri-lanka'],
            ['Thailand', 7, 'thailand'],
            ['Vietnam', 7, 'vietnam'],
            ['Australia', 8, 'australia'],
            ['New Zealand', 8, 'new-zealand'],
            ['Antarctica', 9, 'antarctica'],
            ['Arctic', 9, 'arctic'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%country}}');
    }
}
