import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateKnowledgeDto {
    @IsString()
    @IsNotEmpty({ message: 'Le texte ne peut pas être vide' })
    @MinLength(10, { message: 'Le texte doit contenir au moins 10 caractères' })
    text: string;
}
