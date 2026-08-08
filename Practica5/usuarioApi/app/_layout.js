import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="detalles"
        options={{
          title: "Detalle del usuario",
          headerShown: true,
          headerBackTitle: "(tabs)",
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { fontWeight: "600", fontSize: 16 },
        }}
      />
      <Stack.Screen
        name="actualizar"
        options={{
          title: "Actualizar Usuario",
          headerShown: true,
          headerBackTitle: "Detalle del usuario",
          headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { fontWeight: "600", fontSize: 16 },
        }}
      />
    </Stack>
  );
}