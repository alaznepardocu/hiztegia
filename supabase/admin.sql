-- 1) Antes: Authentication -> Users -> Add user -> Create new user (marca "Auto Confirm User")
-- 2) Después, ejecuta esto cambiando el email:
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'
where email = 'tu@email.com';

-- Comprobar:
-- select email, raw_app_meta_data from auth.users;

-- Quitar el rol:
-- update auth.users set raw_app_meta_data = raw_app_meta_data - 'role' where email = 'tu@email.com';

-- Importante: después de dar el rol, esa persona debe cerrar sesión y volver a entrar.
