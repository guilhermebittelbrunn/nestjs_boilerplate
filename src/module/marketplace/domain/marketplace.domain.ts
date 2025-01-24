import { MarketplaceModel } from '@prisma/client';

import MarketplaceIntegrator from './marketplaceIntegrator.domain';

import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

interface IMarketplaceProps extends MarketplaceModel {
  marketplaceIntegrators?: MarketplaceIntegrator[];
}

export default class Marketplace extends Entity<IMarketplaceProps> {
  constructor(props: IMarketplaceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get marketplaceIntegrators(): MarketplaceIntegrator[] {
    return this.props.marketplaceIntegrators;
  }

  get defaultIntegration(): MarketplaceIntegrator {
    return this.props.marketplaceIntegrators.find((integrator) => integrator.isDefault);
  }

  public static create(props: IMarketplaceProps, id?: UniqueEntityID) {
    return new Marketplace(props, id);
  }
}
