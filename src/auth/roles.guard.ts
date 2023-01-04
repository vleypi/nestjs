import { Injectable, CanActivate, ExecutionContext,UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from '@nestjs/jwt'
import {Reflector} from '@nestjs/core'
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ){

    }

    canActivate(contex: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                contex.getHandler(),
                contex.getClass()
            ])

            if(!requiredRoles){
                return true
            }

            const req = contex.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role => requiredRoles.includes(role.value))
        }
        catch(e){
            throw new HttpException('Нет доступа',HttpStatus.FORBIDDEN)
        }
    }
}


