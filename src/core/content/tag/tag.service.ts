import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDTO } from './tag.dto';

@Injectable()
export class TagService {

    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) { }

    async findAll(): Promise<any> {
        try {
            const articlesList = await this.tagRepository.find({
                order: {
                    name: "DESC"
                }
            });
            return { blogs: articlesList };
        } catch (err) {
            console.log("TagService - findAll: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting articles',
            }, 500);
        }
    }

    async createTag(createDTO: CreateTagDTO): Promise<any> {
        try {

            let tagToReturn = null;

            const tagExist = await this.tagRepository.findOne({
                where: { name: createDTO.tagName.trim().toUpperCase() }
            });

            if (tagExist) {

                tagToReturn = tagExist;

            } else {

                let newTag = await this.tagRepository.create({
                    name: createDTO.tagName
                });
                tagToReturn = await this.tagRepository.save(newTag);

            }

            return { tag: tagToReturn };
        } catch (err) {
            console.log("TagService - createTag: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error creating tag',
            }, 500);
        }
    }

    // async findStateById(stateId: number): Promise<any> {
    //     try {
    //         const state = await this.cityRepository.findOne(stateId);
    //         return { state: state };
    //     } catch (err) {
    //         console.log("CityService - findStateById: ", err);

    //         throw new HttpException({
    //             status: HttpStatus.INTERNAL_SERVER_ERROR,
    //             error: 'Error getting state',
    //         }, 500);
    //     }
    // }

}