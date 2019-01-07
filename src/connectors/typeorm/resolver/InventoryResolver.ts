import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { PaginationArgs } from '../common/PaginationArgs';
import { Inventory, InventoryInput } from '../entity/Inventory';

@Resolver(Inventory)
export class InventoryResolver {
  constructor(
    @InjectRepository(Inventory) private readonly inventoryRepository: Repository<Inventory>
  ) {}

  @Query(_returns => Inventory)
  inventoryInfo(@Arg('uid') uid: string): Promise<Inventory> {
    return this.inventoryRepository.findOneOrFail(uid);
  }

  @Query(_returns => [Inventory])
  inventoryFeed(@Args() { skip, take }: PaginationArgs): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      skip,
      take,
    });
  }

  @Mutation(_returns => Inventory)
  addInventory(@Arg('inventory') inventory: InventoryInput): Promise<Inventory> {
    return this.inventoryRepository.save(inventory);
  }

  @Mutation(_returns => Inventory, { nullable: true })
  async deleteInventory(@Arg('uid') uid: string): Promise<Inventory | null> {
    try {
      const inventory = await this.inventoryRepository.findOneOrFail(uid);
      return this.inventoryRepository.remove(inventory);
    } catch (error) {
      return null;
    }
  }
}
