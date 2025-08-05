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
 * @property integer $region_id Ссылка
 *
 * @property Region $region
 */
class Country extends ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'country';
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
            [['region_id'], 'integer'],
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
            'region_id' => 'Region',
        ];
    }

    public function getRegion()
    {
        return $this->hasOne(Region::class, ['id' => 'region_id']);
    }

}
