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
                authority: `https://login.microsoftonline.com/common/${environment.msalConfig.tenantId}`,
                redirectUri: environment.msalConfig.redirect,
                postLogoutRedirectUri: environment.msalConfig.redirect
            },
            cache: {
                cacheLocation: BrowserCacheLocation.LocalStorage
            },
            system: {
                allowNativeBroker: false,
                loggerOptions: {
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
            interactionType: InteractionType.Popup,
            protectedResourceMap
        };
    }

    /*
        MSAL Guard is required to protect routes and require
        authentication before accessing protected routes
    */
    public static MSALGuardConfigFactory(): MsalGuardConfiguration {
        return {
            interactionType: InteractionType.Popup,
            authRequest: {
                scopes: environment.graph.scopes
            }
        };
    }
}
