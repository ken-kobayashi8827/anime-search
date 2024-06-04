CREATE TRIGGER create_profile_for_user_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION create_profile_for_user();


