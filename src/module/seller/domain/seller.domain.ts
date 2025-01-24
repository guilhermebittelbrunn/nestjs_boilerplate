import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

interface ISellerProps {
  name: string;
}

export default class Seller extends Entity<ISellerProps> {
  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  constructor(props: ISellerProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ISellerProps, id?: UniqueEntityID) {
    return new Seller(props, id);
  }
}
