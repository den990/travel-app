<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "tour".
 *
 * @property int $id
 * @property string $name
 * @property int $price
 * @property string|null $description
 * @property string|null $travel_style
 * @property string|null $service_level
 * @property string|null $physical_rating
 * @property string|null $trip_type
 * @property string|null $age_requirement
 * @property string|null $start_date
 * @property int $country_id
 * @property int $duration
 * @property string|null $logo_img
 *
 * @property Country $country
 */
class Tour extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tour';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'price', 'country_id', 'duration'], 'required'],
            [['price', 'country_id', 'duration'], 'integer'],
            [['price', 'duration'], 'integer', 'min' => 0],
            [['description', 'travel_style', 'service_level', 'physical_rating', 'trip_type', 'age_requirement'], 'string'],
            [['start_date'], 'date', 'format' => 'php:Y-m-d'],
            [['name', 'logo_img'], 'string', 'max' => 255],
            [['country_id'], 'exist', 'skipOnError' => true, 'targetClass' => Country::class, 'targetAttribute' => ['country_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название тура',
            'price' => 'Цена тура',
            'description' => 'Описание тура',
            'travel_style' => 'Стиль путешествия',
            'service_level' => 'Уровень обслуживания',
            'physical_rating' => 'Уровень сложности',
            'trip_type' => 'Тип поездки',
            'age_requirement' => 'Возраст',
            'start_date' => 'Дата начала',
            'country_id' => 'Страна',
            'duration' => 'Продолжительность тура',
            'logo_img' => 'Карта тура',
        ];
    }

    /**
     * Связь с моделью Country
     */
    public function getCountry()
    {
        return $this->hasOne(Country::class, ['id' => 'country_id']);
    }
}
