import { container } from 'inversify-props'
import { ConnectionService } from '@/shared/service/user'
import { ConnectionServiceInterface } from '@/shared/service/user'

export default (): void => {
  // Bind shared services
  container.addSingleton<ConnectionServiceInterface>(ConnectionService)
}
