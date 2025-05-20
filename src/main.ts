import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { loadingInterceptor } from './app/core/loading/loading.interceptor';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...(appConfig.providers || []),
        provideHttpClient(withInterceptors([loadingInterceptor])),
    ],
});
