<?php
namespace frontend\models\searches;
use common\models\Tour;
use yii\base\Model;
use yii\data\ActiveDataProvider;

class TourSearch extends Model
{

    public $start_date_min;
    public $start_date_max;
    public $price_min;
    public $price_max;
    public $duration_min;
    public $duration_max;
    public $name;

    public function rules()
    {
        return [
            [['start_date_min', 'start_date_max'], 'date', 'format' => 'php:Y-m-d'],
            [['price_min', 'price_max', 'duration_min', 'duration_max'], 'integer'],
            [['name'], 'string'],
        ];
    }

    public function searchByCountryId($ids, $params)
    {
        $query = Tour::find()->where(['country_id' => $ids]);

        $this->load($params);

        $query->andFilterWhere(['>=', 'start_date', $this->start_date_min])
            ->andFilterWhere(['<=', 'start_date', $this->start_date_max])
            ->andFilterWhere(['>=', 'price', $this->price_min])
            ->andFilterWhere(['<=', 'price', $this->price_max])
            ->andFilterWhere(['>=', 'duration', $this->duration_min])
            ->andFilterWhere(['<=', 'duration', $this->duration_max])
            ->andFilterWhere(['like', 'name', $this->name]);

        return new ActiveDataProvider([
            'query' => $query,
            'sort' => false,
            'pagination' => [
                'pageSize' => 15,
            ],
        ]);
    }

    public function searchByName($params)
    {
        $query = Tour::find();

        $this->load($params);

        $query->andFilterWhere(['like', 'name', $this->name]);
        return new ActiveDataProvider([
            'query' => $query,
            'sort' => false,
            'pagination' => [
                'pageSize' => 15,
            ],
        ]);
    }
}