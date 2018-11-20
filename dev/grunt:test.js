/**
 *
 * ----
 *
 * ### `grunt test`
 *
 * **Subtareas:** 
 *
 * - `unit`
 * - `e2e`
 * 
 * **Descripción:** Arranca los tests unitarios y luego los tests de usuario.
 * 
 */
module.exports = (grunt) => ["unit", "e2e"];
