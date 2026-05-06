import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

interface VaultAttributes {
  id: number;
  vaultId:string
}

interface VaultCreationAttributes extends Omit<VaultAttributes, "id"> {}

@Table({
  tableName: "vaults",
  timestamps: true,
})
export class Vault extends Model<VaultAttributes, VaultCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique:true
  })
  declare vaultId: string;

  

}