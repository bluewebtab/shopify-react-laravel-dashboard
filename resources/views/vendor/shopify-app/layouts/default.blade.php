<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ \Osiset\ShopifyApp\getShopifyConfig('app_name') }}</title>
        <link rel="stylesheet" href="{{asset('template/main.css')}}">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        @yield('styles')
    </head>

    <body>
    TESTING
        <div class="app-wrapper">
            <div class="app-content">
                <main role="main">
                    @yield('content')
                </main>
            </div>
        </div>

        @if(\Osiset\ShopifyApp\getShopifyConfig('appbridge_enabled'))
            <script src="https://unpkg.com/@shopify/app-bridge{{ \Osiset\ShopifyApp\getShopifyConfig('appbridge_version') ? '@'.config('shopify-app.appbridge_version') : '' }}"></script>
            <script>
                var AppBridge = window['app-bridge'];
                var createApp = AppBridge.default;
                var app = createApp({
                    apiKey: '{{ \Osiset\ShopifyApp\getShopifyConfig('api_key', Auth::user()->name ) }}',
                    shopOrigin: '{{ Auth::user()->name }}',
                    forceRedirect: true,
                });
            </script>

            @include('shopify-app::partials.flash_messages')
        @endif

        <input type="hidden" id="apiKey" value="{{config('shopify-app.api_key')}}">
        <input type="hidden" id="shopOrigin" value="{{Auth::user()->name}}">

        <script src="{{asset('js/app.js')}}"></script>
        @yield('scripts')
    </body>
</html>
