import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Image, ImageInput } from '../entity/Image';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Resolver(Image)
export class ImageResolver {
  constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>) {}

  @Query(_returns => [Image])
  imageFeed(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  @Mutation(_returns => Image)
  addImage(@Arg('image') image: ImageInput): Promise<Image> {
    return this.imageRepository.save(image);
  }
}
