FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY *.sln .
COPY Shihablvl100.Domain/*.csproj ./Shihablvl100.Domain/
COPY Shihablvl100.Application/*.csproj ./Shihablvl100.Application/
COPY Shihablvl100.Infrastructure/*.csproj ./Shihablvl100.Infrastructure/
COPY Shihablvl100.API/*.csproj ./Shihablvl100.API/
RUN dotnet restore

COPY . .
RUN dotnet publish Shihablvl100.API -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Shihablvl100.API.dll"]