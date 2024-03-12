import {
    MsalGuardConfiguration,
    MsalInterceptorConfiguration
} from '@azure/msal-angular';

import {
    BrowserCacheLocation,
    IPublicClientApplication,
    InteractionType,
    LogLevel,
    PublicClientApplication
} from '@azure/msal-browser';
import { environment } from '../../../environments/environment';


export class MsalFactory {
    public static MSALInstanceFactory(): IPublicClientApplication {
        return new PublicClientApplication({
            auth: {
                clientId: environment.msalConfig.clientId,
                authority: `${environment.msalConfig.authority}/${environment.msalConfig.tenantId}`,
                redirectUri: environment.msalConfig.redirect,
                postLogoutRedirectUri: environment.msalConfig.redirect
            },
            cache: {
                cacheLocation: BrowserCacheLocation.LocalStorage
            },
            system: {
                allowNativeBroker: false,
                loggerOptions: {
                    loggerCallback: (_, message: string) => console.log(message),
                    // logLevel: LogLevel.Info,
                    logLevel: LogLevel.Warning,
                    piiLoggingEnabled: false
                }
            }
        });
    }

    /*
        MSAL Interceptor is required to request access tokens
        in order to access the protected resource (Graph)
    */
    public static MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
        const protectedResourceMap = new Map<string, Array<string>>();
        protectedResourceMap.set(environment.graph.uri, environment.graph.scopes);

        return {
            interactionType: InteractionType.Redirect,
            protectedResourceMap
        };
    }

    /*
        MSAL Guard is required to protect routes and require
        authentication before accessing protected routes
    */
    public static MSALGuardConfigFactory(): MsalGuardConfiguration {
        return {
            interactionType: InteractionType.Redirect,
            authRequest: {
                scopes: environment.graph.scopes
            }
        };
    }
}
