import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessageDto {
    @IsString()
    @IsNotEmpty()
    role: 'user' | 'assistant';

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class ChatDto {
    @IsString()
    @IsNotEmpty({ message: 'La question ne peut pas être vide' })
    question: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => MessageDto)
    history?: MessageDto[];
}
