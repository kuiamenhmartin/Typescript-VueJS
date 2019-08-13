import { AuthModule } from '@/components/auth'
import { ConnectionModule } from '@/components/connection'

// How to inject a dependency
// @Inject() nameService: INameService;

export function containerBuilder (): void {
  // Bind services for each module
  AuthModule.container()
  ConnectionModule.container()
}
