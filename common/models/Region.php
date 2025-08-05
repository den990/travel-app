<?php

namespace common\models;

use Aws\S3\S3Client;
use common\components\YandexS3;
use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Url;

/**
 * This is the model class for table "file".
 *
 * @property int $id УИ записи
 * @property string $name Название страны
 * @property string $slug Ссылка
 *
 * @property Country[] $countries
 */
class Region extends ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'region';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'slug'], 'required'],
            [['name', 'slug'], 'string', 'max' => 255],
            [['slug'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'slug' => 'Slug',
        ];
    }

    public function getCountries()
    {
        return $this->hasMany(Country::class, ['region_id' => 'id']);
    }

}
