import { Length } from 'class-validator';
import { ProjectUser } from 'src/project-user/entities';
import { Role } from 'src/role/entities';
import { UserType } from 'src/user-type/entities';
import { Incidence } from '../../incidence/entities/incidence.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from 'src/photo/entities';
import { PlantUser } from 'src/plant-user/entities';
import { UserDiscipline } from 'src/user-discipline/entities';

@Entity('wo_soldoza_sec_usuarios')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nombre_usuario', type: 'varchar', length: 70 })
  nombreUsuario: string;

  @Column({ name: 'apellidos_usuario', type: 'varchar', length: 70 })
  apellidosUsuario: string;

  @Column({ name: 'email_usuario', type: 'varchar', length: 70 })
  emailUsuario: string;

  @Column({ name: 'password_usuario', type: 'varchar' })
  @Length(5, 20)
  passwordUsuario: string;

  @Column({ name: 'foto_usuario', type: 'varchar', nullable: true })
  fotoUsuario: string;

  @Column({ name: 'firma_usuario', type: 'varchar', nullable: true })
  firmaUsuario: string;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'rolid' })
  rol: Role;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.usuario)
  projectUsers: ProjectUser[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioCreador)
  incidentesCreados: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioRejected)
  incidentesRejected: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioReceived)
  incidentesReceived: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioCommented)
  incidentesCommented: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioCorrected)
  incidentesCorrected: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioClosed)
  incidentesClosed: Incidence[];

  @OneToMany(() => Incidence, (incidence) => incidence.usuarioApproved)
  incidentesApproved: Incidence[];

  @OneToMany(() => Photo, (photo) => photo.usuario)
  incidenteFotos: Photo[];

  @ManyToOne(() => UserType, (userType) => userType.usuarios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tipo_usuario_id' })
  tipoUsuario: UserType;

  @Column({ name: 'token', type: 'varchar', nullable: true })
  token: string;

  @OneToMany(() => PlantUser, (plantUser) => plantUser.instalacion)
  instalacionesUsuarios: PlantUser[];

  @OneToMany(() => UserDiscipline, (userDiscipline) => userDiscipline.usuario)
  usuarioDisciplinas: UserDiscipline[];
}
