<?php

namespace common\models;

use Aws\S3\S3Client;
use common\components\YandexS3;
use Yii;
use yii\helpers\Url;

/**
 * This is the model class for table "file".
 *
 * @property int $id УИ записи
 * @property string $storage Тип хранилища
 * @property string $name Оригинальное имя файла
 * @property string $ext Расширение файла
 * @property int $size Размер в байтах
 * @property string $bucket Имя бакета в S3 хранилище | Путь к файлу в локальном хранилище относительно папки проекта
 * @property string $key Ключ объекта в S3 хранилище | Имя файла в файловой системе в локальном хранилище
 * @property string $date Дата загрузки
 */
class File extends \yii\db\ActiveRecord
{
    const LOCAL_STORAGE = 'local';
    const S3_STORAGE = 's3';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['storage', 'name', 'ext', 'size', 'bucket', 'key', 'date'], 'required'],
            [['size'], 'integer'],
            [['date'], 'safe'],
            [['storage'], 'string', 'max' => 10],
            [['name', 'key'], 'string', 'max' => 255],
            [['ext'], 'string', 'max' => 25],
            [['bucket'], 'string', 'max' => 350],
            [['key'], 'unique'],
            [['storage'], 'in', 'range' => [self::LOCAL_STORAGE, self::S3_STORAGE]],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'storage' => 'Storage',
            'name' => 'Name',
            'ext' => 'Ext',
            'size' => 'Size',
            'bucket' => 'Bucket',
            'key' => 'Key',
            'date' => 'Date',
        ];
    }

    public function url()
    {
        if($this->storage == self::LOCAL_STORAGE) {
            if(Yii::$app->has('urlManagerFrontend'))
                Yii::$app->urlManagerFrontend->createAbsoluteUrl(['/file/get', 'id' => $this->id, 'key' => $this->key]);
            return Url::to(['/file/get', 'id' => $this->id, 'key' => $this->key]);
        }
        elseif ($this->storage == self::S3_STORAGE){
            $s3 = new S3Client(YandexS3::clientParams());
            $cmd = $s3->getCommand('GetObject', [
                'Bucket' => $this->bucket,
                'Key' => $this->key,
                'ResponseContentDisposition' => "attachment; filename=$this->name.$this->ext"
            ]);

            $request = $s3->createPresignedRequest($cmd, '+10 minutes');
            return (string)$request->getUri();
        }

        return null;
    }

    public function baseName()
    {
        return "$this->name.$this->ext";
    }

    public function delete()
    {
        try{
            if($this->storage == self::LOCAL_STORAGE){
                $loadedFile = $this->bucket;
                if(file_exists($loadedFile))
                    unlink($loadedFile);
                return parent::delete();
            }elseif ($this->storage == self::S3_STORAGE){
                $s3 = new S3Client(YandexS3::clientParams());
                $s3->deleteObject([
                    'Bucket' => $this->bucket,
                    'Key' => $this->key,
                ]);
                return parent::delete();
            }
        }catch (\Throwable $e){
            throw $e;
        }
        return false;
    }
}
