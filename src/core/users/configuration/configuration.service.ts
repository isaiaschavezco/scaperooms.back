import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Configuration } from './configuration.entity';
import { UpdateClubStatusDTO, UpdateThemeDTO, UpdateBiodermaGameStatusDTO, UpdateBiodermaGameImageDTO, UpdateBiodermaGameCampaingImageDTO, UpdateBiodermaGameBlogImageDTO } from './configuration.dto';

@Injectable()
export class ConfigutarionService {

    constructor(@InjectRepository(Configuration) private configurationRepository: Repository<Configuration>) { }

    async findGeneralConfiguration(): Promise<any> {
        try {

            const generalConfiguration = await this.configurationRepository.findOne(1);

            return { general: generalConfiguration };

        } catch (err) {
            console.log("ConfigutarionService - findGeneralConfiguration: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting general status',
            }, 500);
        }
    }

    async findClubStatus(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            return { statusCart: clubStatus.isClubBiodermaActive };

        } catch (err) {
            console.log("ConfigutarionService - findClubStatus: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting club status',
            }, 500);
        }
    }

    async findThemeColor(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            let seasonColor = [];

            switch (clubStatus.themes) {
                case 1:
                    seasonColor = [
                        '#449c44', '#f1f9f1', '#95db95', '#449c44', '#1c541c',
                        '#C8E8C8', '#F1F9F1'
                    ];
                    break;

                case 2:
                    seasonColor = [
                        '#F99F28', '#FDFAF6', '#F99F28', '#AF6B11', '#734810',
                        '#FFDDB1', '#FDFAF6'
                    ];
                    break;

                case 3:
                    seasonColor = [
                        '#D18E95', '#FAF6F7', '#D6717D', '#A31A29', '#7e101c',
                        '#EED0D3', '#FAF6F7'
                    ];
                    break;

                case 4:
                    seasonColor = [
                        '#526987', '#EEF7FB', '#8AC6E1', '#009DE0', '#005980',
                        '#D0EDF9', '#EEF7FB'
                    ];
                    break;
                default:
                    break;
            }

            return { seasonColors: seasonColor };

        } catch (err) {
            console.log("ConfigutarionService - findThemeColor: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting theme',
            }, 500);
        }
    }

    async findBiodermaGameStatus(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            return { statusBioderma: clubStatus.isBiodermaGameActive };

        } catch (err) {
            console.log("ConfigutarionService - findBiodermaGameStatus: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting biodermagame status',
            }, 500);
        }
    }

    async findBiodermaGameImage(): Promise<any> {
        try {

            const clubStatus = await this.configurationRepository.findOne(1);

            return {
                biodermaImage: clubStatus.biodermaGameImage,
                biodermaGameCampaingImage: clubStatus.biodermaGameCampaingImage,
                biodermaGameBlogImage: clubStatus.biodermaGameBlogImage
            };

        } catch (err) {
            console.log("ConfigutarionService - findBiodermaGameImage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting biodermagame image',
            }, 500);
        }
    }

    async updateClub(updateClubStatusDTO: UpdateClubStatusDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.isClubBiodermaActive = updateClubStatusDTO.isClubBiodermaActive;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateClub: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting theme',
            }, 500);
        }
    }

    async updateTheme(updateThemeDTO: UpdateThemeDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.themes = updateThemeDTO.theme;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateTheme: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting theme',
            }, 500);
        }
    }

    async updateBiodermaGame(updateBiodermaGameStatusDTO: UpdateBiodermaGameStatusDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.isBiodermaGameActive = updateBiodermaGameStatusDTO.isBiodermaGameActive;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateBiodermaGame: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error getting theme',
            }, 500);
        }
    }

    async updateBiodermaGameImage(updateBiodermaGameImageDTO: UpdateBiodermaGameImageDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.biodermaGameImage = updateBiodermaGameImageDTO.biodermaGameImage;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateBiodermaGameImage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting image',
            }, 500);
        }
    }

    async updateBiodermaGameCampaingImage(imageRequest: UpdateBiodermaGameCampaingImageDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.biodermaGameCampaingImage = imageRequest.biodermaGameCampaingImage;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateBiodermaGameCampaingImage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting image',
            }, 500);
        }
    }

    async updateBiodermaGameBlogImage(imageRequest: UpdateBiodermaGameBlogImageDTO): Promise<any> {
        try {

            let configToUpdate = await this.configurationRepository.findOne(1);

            configToUpdate.biodermaGameBlogImage = imageRequest.biodermaGameBlogImage;

            await this.configurationRepository.save(configToUpdate);

            return { status: 0 };

        } catch (err) {
            console.log("ConfigutarionService - updateBiodermaGameBlogImage: ", err);

            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error setting image',
            }, 500);
        }
    }

}