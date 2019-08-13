import { container } from 'inversify-props'
import { AuthService } from '@/shared/service/user'
import { AuthServiceInterface } from '@/shared/service/user'

export default (): void => {
  // Bind shared services
  container.addSingleton<AuthServiceInterface>(AuthService)
}
// TODO: https://itnext.io/typescript-dependency-injection-setting-up-inversifyjs-ioc-for-a-ts-project-f25d48799d70
