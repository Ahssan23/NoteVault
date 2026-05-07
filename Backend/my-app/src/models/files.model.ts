import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

interface FilesAttributes {
  id: number;
  title: string;
  desc:string;
  vaultId:string;
}

interface FileCreationAttributes extends Omit<FilesAttributes, "id"> {}

@Table({
  tableName: "files",
  timestamps: true,
})
export class Files extends Model<FilesAttributes, FileCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique:false
  })
  declare title: string;@Column({
    type: DataType.STRING,
    allowNull: false,
    unique:false
  })
  declare desc: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique:true
  })
  declare vaultId: string;

  

}