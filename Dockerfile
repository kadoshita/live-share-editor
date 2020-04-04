FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.3-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/core/sdk:3.1.201-buster AS build
WORKDIR /src
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs
COPY LiveShareEditor.csproj .
RUN dotnet restore "LiveShareEditor.csproj"
COPY . .
RUN sed -i -e s/LATEST_RELEASE_VERSION_TAG/$(git describe --abbrev=0 --tags)/ ./ClientApp/src/components/NavMenu.js
RUN mkdir -p /usr/local/share/dotnet/sdk/NuGetFallbackFolder
RUN dotnet build "LiveShareEditor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LiveShareEditor.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LiveShareEditor.dll"]