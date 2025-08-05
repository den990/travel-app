<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%region}}`.
 */
class m250702_113825_create_region_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%region}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->notNull()->comment('Название страны'),
            'slug' => $this->string()->notNull()->comment('Ссылка'),
            'description' => $this->text()->comment('Описание'),
        ]);

        $this->batchInsert('{{%region}}', ['name', 'slug', 'description'], [
            ['North America', 'north-america', 'A bountiful land of eye-popping landscapes, sprawling cities, and adventure at every turn, North America combines the wonders of nature and man together into an unbeatable package. Out in the wilds, you’ll encounter forests of towering trees, sun-blasted deserts, mountains that scrape the heavens themselves, and loads of sparkling lakes and rivers. Meanwhile, the cities teem with all manner of sensory delights, from cutting-edge music and art to caught-that-morning seafood and burgers as big as your head. These are the lands of plenty, and there’s always enough for seconds (or thirds).'],
            ['Central America & Caribbean', 'central-america', 'A skinny belt of countries and islands connecting two much larger continents, Central America and the Caribbean don’t look like much on the map. But looks have never been more deceiving: enveloping rainforests teeming with all manner of wildlife; cloud-shrouded volcanoes; charming colonial towns; mysterious Mayan ruins; and mile upon glorious mile of white-sand beaches await travellers curious enough to come looking for them. And as much fun as they are to explore by day, these lands truly come alive at night – often to the beat of salsa, calypso or reggae. These places may be unfamiliar, but now’s the best time to get introduced.'],
            ['South America', 'south-america', 'A land awash in ancient history, mind-boggling landscapes, entrancing culture, and non-stop fun, there’s a side of South America that’s perfect for every traveller – including you. The colossal peaks of Patagonia and the Andes beg to be climbed, while the enveloping rainforests that surround the mighty Amazon seem designed to be explored. Along the way, reminders of the Inca, the conquistadors, and others who came before dot the landscape, and the intoxicating pull of the vibrant cities is never far away. The time of your life awaits down here. All you have to do is find it.'],
            ['Europe', 'europe', 'In terms of pure convenience, no continent can touch Europe’s diversity. With so many countries, cultures, languages, and varieties of cuisine packed into such a comparatively tiny place, you can spend a week in Europe and experience something wildly different every day. All that variety can be overwhelming, but the secret to getting the most out of Europe is to take it slow. The Old World has stood for centuries, and it’ll all still be here when you’re ready to come back (which, of course, you’ll want to do immediately after getting home.)'],
            ['North Africa & Middle East', 'north-africa-middle-east', 'As the birthplace of three of the world’s major religions – Christianity, Islam, and Judaism – there’s something inherently spiritual about North Africa and the Middle East. You can feel it everywhere; in the ancient temples and mosques, in the intoxicating aromas of the bazaars and souks, even in the stunning mountains and red-and-ochre dunescapes that surround cities that have stood since the dawn of time. And while the past is your constant companion in this part of the world, there’s plenty of room to write some history of your own.'],
            ['Africa', 'africa', 'Its name means “sunny place” in the Berber tongue, but “Africa” may as well be a synonym for “vastness.” A truly massive continent comprising over 20% of the planet’s available land, Africa is home to the world’s largest desert, its longest river, its hottest temperatures, and hundreds of dialects and cultures spread among a billion people. But as mind-boggling as it seems at first, you’ll be amazed how intimate it feels once you get to know it. This is adventure’s last great frontier. Come blaze some trails.'],
            ['Asia', 'asia', 'Sum up touring Asia in a paragraph? Good luck. Positively massive by just about every measure, the sole thread that unites this diverse continent is the sheer diversity of experiences it presents to travellers. Arid deserts and towering peaks; secluded temples and bustling markets; tiny villages and sprawling cities; ancient history and cutting-edge modernity; teeming crowds and places so remote you won’t find another human being around for miles—Asia encompasses all this and so, so, so much more. Don’t expect to absorb it all; dive on in and let it seep into your skin.'],
            ['Oceania', 'oceania', 'A massive swath of the South Pacific dotted with islands both huge and miniscule, Oceania is a region simultaneously divided and united by the sea. The coastlines of Australia and New Zealand – the largest nations down in this part of the world – are legendary and endless, but it’s what goes on inland that really makes these places special. Cosmopolitan cities, mist-shrouded volcanoes, vast deserts, and isolated communities populated with some of the most interesting people you’ll find anywhere await. There’s no place like this place anyplace, and they can’t wait to prove it to you.'],
            ['Polar', 'polar', 'From icy fjords in the north to penguin-packed shores in the south, our polar cruises take you to the wildest and most remote regions on Earth: Antarctica and the Arctic. Designed to get you off the ship and into the action, these small-group polar expeditions are expert-led, adventure-packed, and full of unforgettable wildlife and wonder.'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%region}}');
    }
}
