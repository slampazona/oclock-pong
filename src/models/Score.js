import { DataTypes, Model } from 'sequelize';
import sequelize from 'src/bdd';
import dayjs from 'dayjs';

/**
* @swagger
*
*  components:
*    schemas:
*      Score:
*        type: object
*        required:
*          - player_1
*          - player_2
*        properties:
*          id:
*            type: integer
*            description: L'id autogénéré du score
*          player_1:
*            type: integer
*            description: Le score du joueur 1
*          player_2:
*            type: integer
*            description: Le score du joueur 2
*          score_date:
*            type: string
*            format: date
*            description: La date du score ( date du moment si non fournie )
*        example:
*           id: 1
*           player_1: 5
*           player_2: 10
*           score_date: 2021-11-29 14:35
*/
class Score extends Model { }

Score.init(
  {
    player_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    player_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score_date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dayjs(this.getDataValue('score_date'));
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'score',
    modelName: 'Score',
  },
);

export default Score;
