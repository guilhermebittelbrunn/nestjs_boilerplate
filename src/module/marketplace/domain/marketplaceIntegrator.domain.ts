import { MarketplaceIntegratorModel } from '@prisma/client';

import Entity from '@/shared/core/domain/Entity';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { MarketplaceIntegratorType } from '@/shared/types/integrator';

interface IMarketplaceIntegratorProps extends MarketplaceIntegratorModel {}

export default class MarketplaceIntegrator extends Entity<IMarketplaceIntegratorProps> {
  constructor(props: IMarketplaceIntegratorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get marketplaceId(): string {
    return this.props.marketplaceId;
  }

  get type(): MarketplaceIntegratorType {
    return this.props.type as MarketplaceIntegratorType;
  }

  get metadata(): Record<string, any> {
    return this.props.metadata as Record<string, any>;
  }

  get isDefault(): boolean {
    return this.props.isDefault;
  }

  /** Merges de new props with the existent ones */
  updateMetadata(value: Record<string, any>): void {
    this.props.metadata = { ...this.metadata, ...value };
  }

  getMetadataValue(objectKey: string): any {
    if (this.props.metadata[objectKey]) return this.props.metadata[objectKey];

    return undefined;
  }

  public static create(props: IMarketplaceIntegratorProps, id?: UniqueEntityID) {
    const propsWithDefault = { ...props, isDefault: false };

    return new MarketplaceIntegrator(propsWithDefault, id);
  }
}
