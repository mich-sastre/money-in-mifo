# Estructura src/ — flujo agnóstico y por país

## ¿Se pueden añadir más países en el futuro?

**Sí.** La app está hecha para eso: cada país es un archivo de configuración (textos, bancos, pasos opcionales). Para sumar un país nuevo hay que tocar solo 3 archivos, siguiendo el mismo patrón que Brasil, Colombia, México y Estados Unidos. Abajo está el paso a paso.

---

## Carpetas

| Carpeta      | Uso |
|-------------|-----|
| **components/** | Componentes reutilizables del flujo (botones, cards, listas). Reciben textos/opciones por props, no conocen el país. |
| **screens/**    | Pantallas del flujo (bienvenida, conectar banco, éxito). Usan la config del país activo. |
| **flow/**       | Lógica del flujo: qué pantalla sigue a cuál, pasos opcionales por país. |
| **config/**     | Configuración por país. Cada país tiene su archivo en `config/countries/`. |
| **theme/**      | Estilos base (colores, espaciado) compartidos. |

## Cómo agregar un país nuevo (paso a paso)

Siempre son los mismos 3 pasos. Ejemplo: agregar Chile (`cl`).

1. **Crear el archivo del país**  
   Crear `src/config/countries/cl.ts` copiando `ar.ts` o `br.ts` y cambiando:
   - `code: 'cl'`
   - `displayName: 'Chile'`
   - Todos los textos (`copy`) al español de Chile (o el idioma que use el país)
   - `bankNames` con bancos de ese país

2. **Declarar el código del país**  
   En `src/config/types.ts`, en la línea de `CountryCode`, añadir `'cl'`:  
   `'ar' | 'br' | 'cl' | 'co' | 'mx'`

3. **Registrarlo en la lista**  
   En `src/config/index.ts`:
   - Añadir al inicio: `import { cl } from './countries/cl';`
   - Dentro de `configs`: añadir `cl,`
   - En `COUNTRY_CODES`: añadir `'cl'` al array

Después de eso, el país aparece en el selector y el flujo usa su configuración. No hace falta tocar pantallas ni componentes.

## Uso de la config

Desde cualquier componente o pantalla:

```ts
import { getCountryConfig, DEFAULT_COUNTRY } from './src/config';
// Con el país activo (luego vendrá del contexto en paso 1.3):
const copy = getCountryConfig(DEFAULT_COUNTRY).copy;
```
